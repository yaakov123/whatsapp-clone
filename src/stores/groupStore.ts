import { Models } from "appwrite";
import { defineStore } from "pinia";
import { execute } from "../api/functions";
import { createGroup } from "../api/teams";
import { FUNCTIONS } from "../config";

export interface Group {
  id?: string;
  name: string;
}

export interface NewGroup {
  name: string;
  invitees: string[];
}

interface State {
  newGroup: NewGroup;
  currentGroup?: Models.Team;
}

export const useGroupStore = defineStore("groupStore", {
  state: () => {
    return {
      newGroup: {
        name: "",
        invitees: [],
      },
      currentGroup: undefined,
    } as State;
  },
  actions: {
    updateNewGroupName(name: string) {
      this.newGroup.name = name;
    },
    addNewGroupInvitee(member: string) {
      this.newGroup.invitees.push(member);
    },
    removeNewGroupInvitee(member: string) {
      this.newGroup.invitees = this.newGroup.invitees.filter(
        (invitee) => invitee !== member
      );
    },
    setNewGroupInvitees(invitees: string[]) {
      this.newGroup.invitees = invitees;
    },
    async createGroup() {
      const team = await createGroup(this.newGroup.name);

      await execute(FUNCTIONS.addMembers, {
        teamId: team.$id,
        invitees: this.newGroup.invitees,
      });

      // Create the group with Appwrite
      // Invite all the invitees to that group
    },
  },
});
