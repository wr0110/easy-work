import { Avatar, Tooltip } from '@geist-ui/core'
import { FC } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface Props {
  src?: string
  onChange?: DropzoneOptions['onDrop']
}

export const UserUploadImage: FC<Props> = ({ src, onChange }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: onChange,
  })

  return (
    <div>
      <Tooltip type="dark" text="Click to upload photo" placement="bottom" trigger="hover">
        <span {...getRootProps()}>
          <Avatar src={src} scale={7.6} />
        </span>
        <input {...getInputProps()} />
      </Tooltip>
    </div>
  )
}
