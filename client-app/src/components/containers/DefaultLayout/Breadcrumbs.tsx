import { Breadcrumbs as BreadcrumbsMUI, Link, Typography } from '@mui/material';

import * as React from 'react';
import {
    Link as RouterLink,
    useLocation,
} from 'react-router-dom';


const breadcrumbNameMap: any = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',
    '/regions': "Regions",
    '/regions/create': "Create",
    '/hotels': "Hotels",
    '/hotels/create': "Create",
    '/hotels/update': "Update"
};

const LinkRouter: React.FC<any> = (props) => <Link {...props} component={RouterLink} />;

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <BreadcrumbsMUI aria-label="breadcrumb" sx={{ color: "#45A29E" }}>
            <LinkRouter underline="none" color="secondary" to="/">
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                    <Typography color="secondary" key={index}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter underline="none" color="secondary" to={to} key={index}>
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </BreadcrumbsMUI>
    );
};

export default Breadcrumbs;