import React from "react"

class TreeCellInfo{
    id: number;
    text: string;
    parentId: number | null;
    treeLevel: number;

    constructor(id: number, text: string, parentId: number| null, treeLevel: number, isRight: boolean = false){
        this.id = id
        this.text = text;
        this.parentId = parentId;
        this.treeLevel = treeLevel;
    }
}

export default TreeCellInfo;