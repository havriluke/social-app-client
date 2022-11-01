import React, { useMemo } from 'react'

const Wrapper = (props) => {
  const screenWidth = useMemo(() => {
    return window.innerWidth
  }, [])

  return (
    <div className={`wrapper ${screenWidth <= 540 ? 'mobile': ''}`}>
        {props.children}
    </div>
  )
}

export default Wrapper