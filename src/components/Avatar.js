import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import { uploadAvatar } from '../http/userAPI'

const Avatar = observer(({className, image, size, authorId, online, profile}) => {
    const {socket} = useContext(Context)
    const [isOnline, setIsOnline] = useState(false)
    const [isImageUploaded, setIsImageUploaded] = useState(false)

    if (online) {
        socket.emit('online', authorId, () => {
            setIsOnline(true)
        })
    }

    useEffect(() => {
        if (!image) {
            setIsImageUploaded(true)
            return
        }
        uploadAvatar(image.name).then(() => {setIsImageUploaded(true)})
    }, [image])
    
    return (
        <div className='avatar__wrapper'>
            {isImageUploaded && <div className={`avatar ${className}`}>
                <div
                    className='avatar__image'
                    style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}${!!image ? image.name : '00avatar.jpg'})`, width: size, height: size}}>
                </div>
            </div>}
            {online && isOnline && <div className='avatar__online'
                style={{border: `${profile ? '4px' : '2px'} solid var(${profile ? '--bg-color' : '--block-color'})`}}
            ></div>}
        </div>
        
    )
})

export default Avatar