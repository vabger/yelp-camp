import React, { Fragment } from 'react'

import { useSelector } from 'react-redux';

import AlertDismissible from '../Alerts/AlertDismissible'

function UserErrors() {
    const userError = useSelector((state) => state.users.error);

    if (userError) {
        return <AlertDismissible
            variant="danger"
            duration={10}
            message={userError.message}
            heading="ERROR!"
        />
    }
    return <Fragment />
}

export default UserErrors
