// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import '@/styles/auth.css'
import '@/styles/globals.css'
import '@/styles/gridjs/sw360.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ReactNode } from 'react'
import { Providers } from '../provider'

import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { Footer, Header } from 'next-sw360'

export const metadata: Metadata = {
    title: {
        template: '%s | SW360 Frontend',
        default: 'SW360 Frontend',
    },
    description: 'SW360 Compliance Management System Graphical Interface.',
    metadataBase: new URL('https://eclipse.org/sw360/'),
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ja' }, { locale: 'vi' }, { locale: 'zh' }, { locale: 'pt-BR' }]
}

type Props = {
    children: ReactNode
    params: { locale: string }
}

async function RootLayout({ children, params: { locale } }: Props) {
    let messages
    try {
        messages = (await import(`@/messages/${locale}.json`)).default
    } catch (error) {
        notFound()
    }
    return (
        <html lang={locale}>
            <body>
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <div id='container'>
                            <div id='content'>
                                <Header />
                                {children}
                                <Footer />
                            </div>
                        </div>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
