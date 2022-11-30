import React, { useState }  from 'react';
import ModalButton from './ModalButton';
import TreeCellInfo from './../TreeCellInfo';

interface IActionTreeModal{
    positionTop: number;
    positionLeft: number;
    currentCell: TreeCellInfo;
    renameCellTitle: (text: string) => void;
    addCellToTree: (treeCell: TreeCellInfo, isRight: boolean) => void;
    clearTreeModel: () => void;
    removeCellFromTree: (cellId: number) => void;
}

enum ActionTreeViewMode{
    CellActions = 0,
    RenameCell = 1
}

const ActionTreeModal = (props: IActionTreeModal) => {
    const [titleInputValue, setTitleInputValue] = useState<string>("");
    const [modalMode, setModalMode] = useState<ActionTreeViewMode>(ActionTreeViewMode.CellActions);

    const onChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.target.value);
    }

    const onClickRemove = () => {
        props.removeCellFromTree(props.currentCell.id);
    }

    const onClickAddCellToTree = () => {
        props.addCellToTree(props.currentCell, true);
    }

    const renderModalViewMode = () => {

        switch(modalMode){
            case ActionTreeViewMode.RenameCell:
                return <div className="action-tree-modal-container">
                    <div className='input-container'>
                        <input type="text" 
                            onChange={(e) => {onChangeTitleInput(e)}}
                        />
                    </div>
                    <div className="button-container">
                        <ModalButton text="Cancel" onClickAction={() => setModalMode(ActionTreeViewMode.CellActions)}/>
                        <ModalButton text="Accept" 
                            onClickAction={() => {
                                props.renameCellTitle(titleInputValue);
                                setModalMode(ActionTreeViewMode.CellActions);
                            }}/>
                    </div>
                </div>;
            case ActionTreeViewMode.CellActions:
                return <div className="action-tree-modal-container">
                    <div className='tree-cell-title'>{props.currentCell.text}</div>
                    <div className="button-container">
                        <ModalButton text="Rename" onClickAction={() => setModalMode(ActionTreeViewMode.RenameCell)}/>
                        <ModalButton text="Add" onClickAction={() => onClickAddCellToTree()}/>
                        <ModalButton text="Remove" onClickAction={onClickRemove }/>
                        <ModalButton text="Clear" onClickAction={props.clearTreeModel}/>
                    </div>
                </div>
        }
    }

    return(
        <div className='action-tree-modal' 
        style={{top: props.positionTop, left: props.positionLeft}}
        onClick={e => e.stopPropagation()}>
            {renderModalViewMode()}
        </div>
    );
}

export default ActionTreeModal;