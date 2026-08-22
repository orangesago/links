'use client';

import type { JSX, KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    CheckIcon,
    CopySimpleIcon,
    QrCodeIcon,
    XIcon,
} from '@phosphor-icons/react';
import type { Gradient } from 'qr-code-styling';

import './QRCodeDialog.css';

interface QRCodeDialogProps {
    readonly siteUrl: string;
}

function getColorToken(name: string): string {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
}

function unifyQrGradient(container: HTMLDivElement) {
    const svg = container.querySelector('svg');
    const sharedGradient = svg?.querySelector<SVGLinearGradientElement>(
        'linearGradient[id^="dot-color"]'
    );

    if (!svg || !sharedGradient) {
        return;
    }

    const sharedFill = `url('#${sharedGradient.id}')`;

    for (const element of svg.querySelectorAll<SVGElement>('[fill^="url"]')) {
        element.setAttribute('fill', sharedFill);
    }

    for (const gradient of svg.querySelectorAll('linearGradient')) {
        if (gradient !== sharedGradient) {
            gradient.remove();
        }
    }
}

export function QRCodeDialog({ siteUrl }: QRCodeDialogProps): JSX.Element {
    const siteHostname = new URL(siteUrl).hostname;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const copiedResetRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const [copied, setCopied] = useState(false);
    const [qrCodeFailed, setQrCodeFailed] = useState(false);

    function showDialog() {
        const dialog = dialogRef.current;

        if (!dialog || dialog.open) {
            return;
        }

        dialog.showModal();
        dialog
            .querySelector<HTMLElement>('.qr-dialog__title')
            ?.focus({ preventScroll: true });
    }

    useEffect(() => {
        let isActive = true;

        async function renderQrCode() {
            const { default: QRCodeStyling } = await import('qr-code-styling');

            if (!isActive || !qrCodeRef.current) {
                return;
            }

            const qrGradient: Gradient = {
                type: 'linear',
                rotation: Math.PI / 4,
                colorStops: [
                    {
                        offset: 0,
                        color: getColorToken('--clr-qr-blue'),
                    },
                    {
                        offset: 0.52,
                        color: getColorToken('--clr-accent'),
                    },
                    {
                        offset: 1,
                        color: getColorToken('--clr-text'),
                    },
                ],
            };

            const qrCode = new QRCodeStyling({
                width: 264,
                height: 264,
                type: 'svg',
                data: siteUrl,
                margin: 12,
                qrOptions: {
                    errorCorrectionLevel: 'H',
                },
                dotsOptions: {
                    type: 'dots',
                    gradient: qrGradient,
                },
                cornersSquareOptions: {
                    gradient: qrGradient,
                    type: 'extra-rounded',
                },
                cornersDotOptions: {
                    gradient: qrGradient,
                    type: 'dot',
                },
                backgroundOptions: {
                    color: 'transparent',
                },
            });

            qrCodeRef.current.textContent = '';
            qrCode.append(qrCodeRef.current);
            unifyQrGradient(qrCodeRef.current);
        }

        renderQrCode().catch(() => {
            if (isActive) {
                setQrCodeFailed(true);
            }
        });

        return () => {
            isActive = false;

            if (qrCodeRef.current) {
                qrCodeRef.current.textContent = '';
            }
        };
    }, [siteUrl]);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (
            new URLSearchParams(globalThis.location.search).get('qr') === '1' &&
            dialog &&
            !dialog.open
        ) {
            showDialog();
        }
    }, []);

    useEffect(
        () => () => {
            if (copiedResetRef.current) {
                clearTimeout(copiedResetRef.current);
            }
        },
        []
    );

    function openDialog() {
        setCopied(false);
        showDialog();
    }

    function closeDialog() {
        dialogRef.current?.close();
    }

    function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
        if (event.target === event.currentTarget) {
            closeDialog();
        }
    }

    function closeFromEscape(event: KeyboardEvent<HTMLDialogElement>) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeDialog();
        }
    }

    async function copyLink() {
        await navigator.clipboard.writeText(siteUrl);
        setCopied(true);

        if (copiedResetRef.current) {
            clearTimeout(copiedResetRef.current);
        }

        copiedResetRef.current = setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    function handleCopyLink() {
        copyLink().catch(() => {
            setCopied(false);
        });
    }

    return (
        <>
            <button
                aria-haspopup='dialog'
                aria-label='Show QR code'
                className='qr-trigger'
                onClick={openDialog}
                ref={triggerRef}
                title='Show QR code'
                type='button'
            >
                <QrCodeIcon aria-hidden size={20} weight='regular' />
            </button>

            <dialog
                aria-labelledby='qr-dialog-title'
                className='qr-dialog'
                onClick={closeFromBackdrop}
                onClose={() => {
                    triggerRef.current?.focus();
                }}
                onKeyDown={closeFromEscape}
                ref={dialogRef}
            >
                <section className='qr-dialog__surface'>
                    <button
                        aria-label='Close QR code'
                        className='qr-dialog__close'
                        onClick={closeDialog}
                        type='button'
                    >
                        <XIcon aria-hidden size={20} weight='regular' />
                    </button>

                    <div className='qr-dialog__header'>
                        <h2
                            className='qr-dialog__title'
                            id='qr-dialog-title'
                            tabIndex={-1}
                        >
                            Scan to open my links
                        </h2>
                    </div>

                    {qrCodeFailed ? (
                        <p className='qr-dialog__qr-error'>
                            The QR code could not load. Use the link below.
                        </p>
                    ) : (
                        <div
                            aria-label={`QR code for ${siteUrl}`}
                            className='qr-dialog__qr'
                            ref={qrCodeRef}
                            role='img'
                        />
                    )}

                    <div className='qr-dialog__link-row'>
                        <a className='qr-dialog__url' href={siteUrl}>
                            {siteHostname}
                        </a>
                        <button
                            aria-label={copied ? 'Copied link' : 'Copy link'}
                            aria-live='polite'
                            className='qr-dialog__copy-button'
                            onClick={handleCopyLink}
                            title={copied ? 'Copied' : 'Copy link'}
                            type='button'
                        >
                            {copied ? (
                                <CheckIcon
                                    aria-hidden
                                    size={16}
                                    weight='regular'
                                />
                            ) : (
                                <CopySimpleIcon
                                    aria-hidden
                                    size={16}
                                    weight='regular'
                                />
                            )}
                        </button>
                    </div>
                </section>
            </dialog>
        </>
    );
}
