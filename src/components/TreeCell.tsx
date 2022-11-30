import React from "react";
import TreeCellInfo from "./../TreeCellInfo";

interface ITreeCell{
    onClickAction: (e: React.MouseEvent, cell: TreeCellInfo) => void;
    
    cell: TreeCellInfo;
}

const TreeCell = (props: ITreeCell) => {

    return(
        <div className="tree-cell" onClick={(e) => props.onClickAction(e, props.cell)}>
            <span className="tree-cell-content">{props.cell.text}</span>
        </div>
    );
}

export default TreeCell;