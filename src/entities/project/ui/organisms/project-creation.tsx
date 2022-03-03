import {
  Button,
  Divider,
  Input,
  Modal,
  Spacer,
  Text,
  Textarea,
} from '@geist-ui/core'
import { Dropbox } from '@icon-park/react'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { DragUpload } from '~/shared/ui/molecules/drag-upload'
import { ChoiceTag } from '..'
import {
  $description,
  $saveProjectLoading,
  $title,
  descriptionChanged,
  formSubmitted,
  titleChanged,
} from '../..'

interface Props {
  visible: boolean
  close(): void
}

export const ProjectCreationForm: FC<Props> = ({ visible, close }) => {
  const title = useStore($title)
  const description = useStore($description)
  const loading = useStore($saveProjectLoading)
  return (
    <Modal height="870px" width="800px" visible={visible} onClose={close}>
      <Modal.Title>Mirio</Modal.Title>
      <Modal.Content>
        <Input
          width="100%"
          value={title}
          placeholder="title"
          onChange={(e) => titleChanged(e.target.value)}
        />
        <Spacer h={1.2} />
        <Textarea
          width="100%"
          value={description}
          onChange={(e) => descriptionChanged(e.target.value)}
        />
        <Spacer h={1.2} />
        <ChoiceTag />
        <Spacer h={1.2} />
        <DragUpload maxFiles={1}>
          <DragGroup>
            <Dropbox size={140} />
            <Text>Drop your photo, here to start uploading</Text>
          </DragGroup>
        </DragUpload>
      </Modal.Content>
      <ModalActions>
        <Divider />
        <ButtonGroup>
          <Button width="70px" mr={0.4} onClick={() => close()}>
            cancel
          </Button>
          <Button
            type="success"
            loading={loading}
            width="70px"
            onClick={() => formSubmitted}
          >
            submit
          </Button>
        </ButtonGroup>
      </ModalActions>
    </Modal>
  )
}

const ModalActions = styled.div`
  overflow: hidden;
  width: 100%;
  padding-top: 12rem;
`

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`

const DragGroup = styled.div`
  text-align: center;
`
