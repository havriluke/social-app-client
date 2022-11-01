import { useState } from "react"
import { addPost, removePost, updatePost } from "../http/postsAPI"


export const usePost = (listData, setListData) => {
    const [isPostModal, setIsPostModal] = useState(false)
    const [isPostLoad, setIsPostLoad] = useState(false)
    const [postParams, setPostParams] = useState({text: '', private: false})

    const openModal = (post) => {
        setPostParams(post)
        setIsPostModal(true)
    }

    const editPost = (post) => {
        updatePost(post).then((data) => {
            const editedList = listData.map((d) => {return d.id === parseInt(post.get('id')) ? data : d})
            setListData(editedList)
        }).catch((e) => {
            console.log(e.response.data.message)
        })
    }

    const createPost = (post) => {
        setIsPostLoad(true)
        addPost(post).then((data) => {
            setIsPostLoad(false)
            setListData([data, ...listData])
        }).catch((e) => {
            console.log(e.response)
        })
    }

    const deletePost = (id) => {
        removePost(id).then(() => {
            setListData(listData.filter(elem => elem.id !== id))
        }).catch((e) => console.log(e.response.data.message))
    }

    return [isPostModal, setIsPostModal, postParams, openModal, deletePost, editPost, createPost, isPostLoad]
}