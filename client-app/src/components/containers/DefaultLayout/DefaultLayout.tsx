import {
    Container,
    IconButton,
    Paper
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import Header from "./Header";
import BreadCrumbs from "./Breadcrumbs";

const DefaultLayout: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    return (
        <>
            <Header />
            <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" } }}>
                <BreadCrumbs />
                <Outlet />
                {showButton && (
                    <IconButton aria-label="edit" sx={{ border: 2, borderColor: "#45A29E", borderRadius: 3, color: "#f1f1f1" }} onClick={scrollToTop} style={{ position: "fixed", bottom: "20px", right: "20px" }}>
                        <ArrowUpward fontSize="large" />
                    </IconButton>
                )}
            </Container>
        </>
    );
}

export default DefaultLayout;