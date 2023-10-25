import Head from 'next/head';

const LandingLayout = ({
    children
    }: {
        children: React.ReactNode;
    }) => {
        return (
            <>
            <Head>
                <link rel="shortcut icon" href="/idea.ico" />
            </Head>
            <main className="h-full bg-[#333333] overflow-auto">
                <div className="mx-auto max-w-screen-xl h-full">
                    {children}
                </div>
            </main>
            </>
        )
    }

    export default LandingLayout