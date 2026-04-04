const Footer = () => {
    return (
        <>
            <footer className="footer fixed bottom-0 left-0 w-full sm:footer-horizontal footer-center bg-base-200 text-base-content p-7">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Neel</p>
                </aside>
            </footer>
        </>
    );
}

export default Footer;