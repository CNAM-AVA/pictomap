import React from 'react'
import { useObservable } from '../utils/ObservableHook'
import { userService } from '../services'


export default function home() {

    const user = useObservable(userService.user);

    return(
        <p>
            Beeh
        </p>
    )
}