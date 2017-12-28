import { WebRequestPayload } from "../../types/Types";
import { takeLast, uniqBy, prop, assoc, filter } from "ramda";

import {
  CLEAR_ALL_SNAPSHOTS,
  ADD_SNAPSHOT_ROW,
  REMOVE_SNAPSHOT_ROW,
  AddSnapshotRowAction,
  RemoveSnapshotRowAction,
  SnapshotAction,
} from "../actions/Snapshots"

const SnapshotsToKeep = 10;

export const snapshots = (state: WebRequestPayload[] = [], action: SnapshotAction): WebRequestPayload[] => {
  switch (action.type) {
    case CLEAR_ALL_SNAPSHOTS:
      return [];
    case ADD_SNAPSHOT_ROW:
      const addAction = action as AddSnapshotRowAction;
      return add(state, addAction.row);
    case REMOVE_SNAPSHOT_ROW:
      const removeAction = action as RemoveSnapshotRowAction;
      return remove(state, removeAction.row);
    default:
      return state;
  }
};

const add = (state: WebRequestPayload[], row: WebRequestPayload): WebRequestPayload[] => {
  const added = [...state, row];
  const uniq = uniqBy(prop("browserRequestId"), added) as WebRequestPayload[];
  return takeLast(SnapshotsToKeep, uniq);
};

const remove = (state: WebRequestPayload[], row: WebRequestPayload): WebRequestPayload[] => {
  return filter((wrp: WebRequestPayload) => wrp.browserRequestId != row.browserRequestId, state);
};
