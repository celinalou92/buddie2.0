import type { Metadata } from 'next'
import './index.css'

export const metadata: Metadata = {
  title: 'Buddie',
  description: 'This application is a social media platform that allows users to manage shared household chores/tasks and interact via a messageboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=Passion+One&family=Poiret+One&family=Quicksand&family=Thasadith&family=Truculenta:wght@100&display=swap"
          rel="stylesheet"
        />
        <title>Buddie</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {children}
      </body>
    </html>
  );
}
