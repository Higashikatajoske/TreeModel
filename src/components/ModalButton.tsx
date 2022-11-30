import React from 'react';

interface IModalButton{
    onClickAction?: () => void;
    text: string;
}

const ModalButton = (props: IModalButton) => {

    return(<button onClick={props.onClickAction}>{props.text}</button>)
}

export default ModalButton;