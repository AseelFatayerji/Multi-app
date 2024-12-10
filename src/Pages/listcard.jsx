import Draggable, { DraggableCore } from "react-draggable";

function ListCrad({ ids, header, items, trash, edit, check }) {
  return (
    <Draggable>
      <div id={"listcard" + ids}>
        <div class="card-body">
          <div class="list-header float-container space-even gap">
            <div>
              <input
                type="text"
                id={"titlecard" + ids}
                class="title"
                placeholder="List Title"
                fdprocessedid="wjgeae"
                value={header}
              />
            </div>
          </div>
          <div class="inputs float-container space-between gap">
            <div>
              <div>{check}</div>
              <div>{trash}</div>
              <div>{edit}</div>
            </div>
            <div>
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
export default ListCrad;
