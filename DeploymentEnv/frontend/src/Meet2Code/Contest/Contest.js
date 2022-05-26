import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Style from 'style-it';

const Contest = (props) => {

    let contestId = useParams()['id']
    return Style.it(
        `
        .contest-area{
            background-color:${props.theme[0]};
            width : 100%;
            height : 100%;
        }
        `
        ,
            <div className='contest-area'>

            </div>
    )
}

export default Contest;