import React, {useState, useEffect} from 'react';
import './treeModel.css';
import ActionTreeModal from './components/ActionTreeModal';
import TreeCellInfo from './TreeCellInfo';
import TreeView from './components/TreeView';

const TreeModel = () => {
    const [treeList, setTreeList] = useState<TreeCellInfo[]>([new TreeCellInfo(0, "cell", null, 1)]);
    const [isVisibleActionModel, setVisibleActionModel] = useState<boolean>(false);
    const [activeTreeCell, setActiveTreeCell] = useState<TreeCellInfo>(treeList[0]);
    const [positionModalTop, setPositionModalTop] = useState<number>(0);
    const [positionModalLeft, setPositionModalLeft] = useState<number>(0);

    const getVisibleActionModel = (e: React.MouseEvent, cell: TreeCellInfo) => {
        setVisibleActionModel(true);
        setPositionModalLeft(e.clientX + 5);
        setPositionModalTop(e.clientY + 5);
        setActiveTreeCell(cell);
        e.stopPropagation();
    }

    const CreateCellTreeId = () => {
        let count: number = 0;
        while (treeList.map(x => x.id).includes(count)){
            count++;
        }
        return count;
    }

    const RenameCellTitle = (newTitle: string) => {

        setTreeList(list => {
            let index = list.findIndex(x => x.id == activeTreeCell.id);
            if (index != -1){
                list[index].text = newTitle;
            }
            return [...list];
        })
    }

    const AddCellToTree = (treeCell: TreeCellInfo, isRight: boolean) => {
        let newCellId = CreateCellTreeId();
        let cell = new TreeCellInfo(newCellId, "cell" + newCellId, treeCell.id, treeCell.treeLevel + 1, isRight);
        setTreeList([...treeList, cell]);
    }

    const ClearTreeModel = () => {
        setTreeList([new TreeCellInfo(0, "cell", null, 1)]);
    }

    const FindCurrentCellConnections = (cellsIds: number[], connectedCells: number[]): number[] => {
        
        cellsIds.forEach(cellId => {
            let foundCells = treeList.filter(x => x.parentId == cellId).map(x => x.id);
            if (foundCells.length == 0)
                return;
            foundCells.forEach(cell => connectedCells.push(cell));
            return FindCurrentCellConnections(foundCells, connectedCells);
        });

        if (cellsIds.length == 1){
            connectedCells.push(cellsIds[0]);
        }
        return connectedCells;
    };

    const RemoveCellFromTreeModel = (cellId: number) => {
        let targetRemoveCell: Array<number> = [cellId];
        let deletedCells = FindCurrentCellConnections(targetRemoveCell, new Array<number>());

        let newTreeList = treeList.filter(x => !deletedCells.includes(x.id));

        setTreeList([...newTreeList]);
    }

    useEffect(() => {
        return;
    }, [treeList])

    return(    
    <div className='treeModel' onClick={() => setVisibleActionModel(false)}>
        <div>
            <TreeView onClickVisibleModal={getVisibleActionModel}  treeCellInfoList={treeList}/>
        </div>

        {isVisibleActionModel && 
            <ActionTreeModal 
            removeCellFromTree={RemoveCellFromTreeModel}
            clearTreeModel={ClearTreeModel}
            addCellToTree={AddCellToTree}
            renameCellTitle={RenameCellTitle}
            currentCell={activeTreeCell}
            positionLeft={positionModalLeft}
            positionTop={positionModalTop}
            />}
    </div>)
}

export default TreeModel;