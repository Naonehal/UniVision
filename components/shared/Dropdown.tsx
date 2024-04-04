import React from 'react'

type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}
const Dropdown = ({ value, onChangeHandler}: DropdownProps) => {
  return (
    <div>Dropdown</div>
  )
}

export default Dropdown