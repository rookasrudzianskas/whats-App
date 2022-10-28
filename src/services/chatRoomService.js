import {API, Auth, graphqlOperation} from "aws-amplify";


export const getCommonChatRoomWithUser = async (userID) => {
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    // get All Chat Rooms of user 1, and then filter the ones that have user 2
    const response = await API.graphql(graphqlOperation(listChatRooms, { id: authUser.attributes.sub }));
    const chatRooms = response.data?.getUser?.ChatRooms?.items || [];

    console.log(chatRooms[0].chatRoom.users.items[0]);

    const chatRoom = chatRooms.find((chatRoomItem) => {
        return chatRoomItem.chatRoom.users.items.some(
            (userItem) => userItem.user.id === userID
        );
    });
    console.log(chatRoom);

    return chatRoom;
    // console.log(response);

}


export const listChatRooms = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            ChatRooms {
                items {
                    chatRoom {
                        id
                        users {
                            items {
                                user {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
