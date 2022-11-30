import React from 'react';

class TreeBlock{

    parentId: number;
    content: JSX.Element | undefined;
    constructor(parentId: number, content: JSX.Element | undefined){
        this.parentId = parentId;
        this.content = content;
    }
}

export default TreeBlock;