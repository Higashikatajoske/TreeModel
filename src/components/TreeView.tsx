import React from 'react';
import TreeCellInfo from './../TreeCellInfo';
import TreeCell from './TreeCell';
import TreeBlock from './../TreeBlock';
interface ITreeView {
    treeCellInfoList: TreeCellInfo[];
    onClickVisibleModal: (e: React.MouseEvent, cell: TreeCellInfo) => void;
}



const TreeView = (props: ITreeView) => {
    const FindMaxLevel = () => {
        let maxLevel = 0;
        props.treeCellInfoList.forEach(treeCell => {
            if (maxLevel < treeCell.treeLevel){
                maxLevel = treeCell.treeLevel;
            }
        });
        return maxLevel;
    }

    const ConnectBlocksNew = (level: number, treeBlocks: TreeBlock[], treeCellInfoList: TreeCellInfo[]):TreeBlock[] => {
        let treeCells = treeCellInfoList.filter(x => x.treeLevel == level);
        let newTreeBlocks : TreeBlock[] = [];
        treeCells.forEach(cell => {
            if (cell.parentId != null)
            {
                let foundBlocks = treeBlocks.filter(x => x.parentId == cell.id);
                if (foundBlocks.length == 0) {
                    let content = <TreeCell cell={cell} onClickAction={props.onClickVisibleModal}/>;

                    newTreeBlocks.push(new TreeBlock(cell.parentId, content));
                    return;
                }
                let newCellContainer = CreateCellContainer(cell, null, foundBlocks);
                newTreeBlocks.push(new TreeBlock(cell.parentId, newCellContainer));
            }
        });
        
        if (level > 2){
            return ConnectBlocksNew(level - 1, newTreeBlocks, treeCellInfoList);
        }
        else{
            return newTreeBlocks;
        }
    }

    const CreateCellContainer = (parentTreeCell: TreeCellInfo, treeCells: TreeCellInfo[] | null, treeBlocks: TreeBlock[] | null ) => {
        let treeCellContainer: JSX.Element;
        let parentTreeCellBlock = <div className="parent-tree-cell-block">
        <TreeCell cell={parentTreeCell ?? new TreeCellInfo(1, "cell", null, 1)} onClickAction={props.onClickVisibleModal} />
        </div>;

        let treeCellBlock: JSX.Element = <></>;
        if (treeCells){
            treeCellBlock = <div className='tree-cell-block'> 
            {treeCells.map((x, index) => <TreeCell cell={x} key={index} onClickAction={props.onClickVisibleModal}/>)}
            </div> ;
        }
        else if (treeBlocks){
            treeCellBlock = <div className='tree-cell-block'> 
            {treeBlocks.map((block) => block.content)}
            </div> ;
        }

        treeCellContainer = <div className='tree-cell-container'>
        {parentTreeCellBlock}
        {treeCellBlock}
        </div>

        return treeCellContainer;
    }

    const ConstructTreeView = ({treeCellInfoList, onClickVisibleModal}:ITreeView) => {
        let maxLevel = FindMaxLevel();
        if (maxLevel > 1){
            let finalParentTreeCell = treeCellInfoList.find(x => x.treeLevel === 1);
            if (finalParentTreeCell != null){
                let finalTreeBlocks = ConnectBlocksNew(maxLevel, new Array<TreeBlock>(), treeCellInfoList);
                return CreateCellContainer(finalParentTreeCell , null, finalTreeBlocks);
            }
        }
        
        let treeCell = props.treeCellInfoList.find(x => x.treeLevel == 1);
        return <TreeCell cell={treeCell ?? new TreeCellInfo(0, "cell", null, 1)} onClickAction={onClickVisibleModal} />;
    }

    return (<>
     { ConstructTreeView({treeCellInfoList: props.treeCellInfoList, onClickVisibleModal:props.onClickVisibleModal})}
    </>);
}



export default TreeView;