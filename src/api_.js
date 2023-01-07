import { api } from "./api"

function proxy({get, set, del}) {
    return new Proxy({}, {get, set})
}


api = {
    auth: {
        tokens: {
            get: ()=>{},
            post: ()=>{}
        },
    },
    entities: {
        self: {
            get: async function () {
                const url = new URL('/api/v0/entities/self')
                return await fetch(url).then(response=>response.json())
            },
        }
    },
    chats: {
        0: {
            avatars: {}
        }
    },
}

async function test() {
    await api.auth.tokens.get()
    await api.auth.tokens.add({username: "TestAlias", password: "0123456789"})
    await api.auth.tokens.remove("testToken")
    await api.users.add()
    await api.bots.post()
    for (key of [0, "@testAlias"]) {
        await api.entities.get(key)
        await api.entities.patch(key, {})
        await api.entities.remove(key)
        await api.entities[key].avatars.get()
        await api.entities[key].avatars.post({})
        await api.entities[key].avatars.delete(0)
        await api.entities[key].permissions.get()
        await api.entities[key].permissions.patch({})
    }
    await api.chats.get({offset: 0, count: 100})
    for (key of [0, "@testAlias"]) {
        await api.chats.get(key)
        await api.chats.delete(key)
        await api.chats[key].messages.get({offset: 0, count: 100})
        await api.chats[key].messages.add({text: "test text"})
        await api.chats[key].messages.get(0)
        await api.chats[key].messages.patch(0, {text: "patch test text"})
        await api.chats[key].messages.remove(0)
        await api.chats[key].messages[0].attachments.get(0, "preview")
        await api.chats[key].messages[0].attachments.get(0, "content")
        await api.chats[key].photos.get({offset: 0, count: 100})
        await api.chats[key].photos.get(0)
        await api.chats[key].photos.remove(0)
    }
    await api.conferences.add({title: "test"})
    for (key of [0, "@testConference"]) {
        await api.conferences[key].members.get({offset: 0, count: 100})
        await api.conferences[key].members.add("@testAlias")
        await api.conferences[key].members.permissions.get()
        await api.conferences[key].members.permissions.patch({})
        for (member in [0, "testAlias"]) {
            await api.conferences[key].members.get(member)
            await api.conferences[key].members.remove(member)
            await api.conferences[key].members[member].permissions.get()
            await api.conferences[key].members[member].permissions.patch({})
        }
    }
}

/*
- `/api/supported_versions`: `GET`
- Authentication
  - `/api/v0/auth/tokens`: `GET`, `POST`
  - `/api/v0/auth/tokens/{token}`: `DELETE`
- Users and bots
  - `/api/v0/users`: `POST` (unauthenticated access)
  - `/api/v0/bots`: `POST`
- Entities (users, bots, conferences)
  - `/api/v0/entities/({eid}|@{alias})`: `GET`, `PATCH`, `DELETE`
  - `/api/v0/entities/({eid}|@{alias})/avatars`: `GET`, `POST`
  - `/api/v0/entities/({eid}|@{alias})/avatars/{id}`: `DELETE`
  - `/api/v0/entities/({eid}|@{alias})/pemissions`: `GET`, `PATCH`
    Users and bots permissons. You can't manage conference's permissions.
- Chats
  - `/api/v0/chats`: `GET`
  - `/api/v0/chats/({eid}|@{alias})`: `GET`, `DELETE`
  - `/api/v0/chats/({eid}|@{alias})/messages`: `GET`, `POST`
  - `/api/v0/chats/({eid}|@{alias})/messages/{id}`: `GET`, `PATCH`, `DELETE`
  - `/api/v0/chats/({eid}|@{alias})/messages/{id}/attachments/{id}/preview`: `GET`
  - `/api/v0/chats/({eid}|@{alias})/messages/{id}/attachments/{id}/content`: `GET`
  - `/api/v0/chats/({eid}|@{alias})/(photos|audios|videos|animations|files)`: `GET`
  - `/api/v0/chats/({eid}|@{alias})/(photos|audios|videos|animations|files)/{id}`: `GET`, `DELETE`
- Conferences
  - `/api/v0/conferences`: `POST`
  - `/api/v0/conferences/({eid}|@{alias})/members`: `GET`, `POST`
  - `/api/v0/conferences/({eid}|@{alias})/members/permissions`: `GET`, `PATCH`
  - `/api/v0/conferences/({eid}|@{alias})/members/{id}`: `GET`, `DELETE`
  - `/api/v0/conferences/({eid}|@{alias})/members/@{alias}`: `GET`, `DELETE`
  - `/api/v0/conferences/({eid}|@{alias})/members/{id}/permissions`: `GET`, `PATCH`
  - `/api/v0/conferences/({eid}|@{alias})/members/@{alias}/permissions`: `GET`, `PATCH`
- Media
  - `/api/v0/media`: `POST`
  - `/api/v0/media/{hash}`: `GET`
  - `/api/v0/media/{hash}/content`: `GET`
  - `/api/v0/media/{hash}/preview`: `GET`
- Contacts
  - `/api/v0/contacts`: `GET`, `POST`
  - `/api/v0/contacts/@{username}`: `GET`, `PATCH`, `DELETE`
  - `/api/v0/contacts/{id}`: `GET`, `PATCH`, `DELETE`
- Events
  - `/api/v0/events`: `GET (Server-Sent Events)`
*/
