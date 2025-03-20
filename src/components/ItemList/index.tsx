import { useItem, useItemDispatch } from "../../itemProvider";
import Card from "../Card";
import Item from "../Item";
import { ItemProps, ItemStatus } from "../NewItem";

function ItemList() {
    const items = useItem();
    const dispatch = useItemDispatch();

    const moveItem = (item: ItemProps) => {
        return dispatch({
            type: "MOVE",
            payload: item
        })
    }

    const ActiveList = items
        .filter(it => it.status == ItemStatus.Active)
        .map(it => <Item onClick={() => moveItem(it)} itemStatus={ItemStatus.Active} key={it.id}>{it.item}</Item>)

    const DeactiveList = items
        .filter(it => it.status == ItemStatus.Deactive)
        .map(it => <Item onClick={() => moveItem(it)} itemStatus={ItemStatus.Deactive} key={it.id}>{it.item}</Item>)

    return (
        <div className='main-container'>
            <Card header='Active Stock'>
                {ActiveList}
            </Card>

            <Card header='Out of Stock'>
                {DeactiveList}
            </Card>
        </div>
    )
}

export default ItemList
