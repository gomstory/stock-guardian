import { useItem } from "../../itemProvider";
import Card from "../Card";
import Item from "../Item";
import { ItemProps, ItemStatus } from "../NewItem";

function Board() {
    const { state, dispatch } = useItem();

    const moveItem = (item: ItemProps) => {
        return dispatch({
            type: "MOVE",
            payload: item
        })
    }

    const ActiveList = state
        .filter(it => it.status == ItemStatus.Active)
        .map(it => <Item onClick={() => moveItem(it)} itemStatus={ItemStatus.Active} key={it.id}>{it.item}</Item>)

    const DeactiveList = state
        .filter(it => it.status == ItemStatus.Deactive)
        .map(it => <Item onClick={() => moveItem(it)} itemStatus={ItemStatus.Deactive} key={it.id}>{it.item}</Item>)

    return (
        <div className='main-container'>
            <Card header='ของใช้ในบ้าน'>
                {ActiveList}
            </Card>

            <Card header='หมด/หมดอายุ'>
                {DeactiveList}
            </Card>
        </div>
    )
}

export default Board
