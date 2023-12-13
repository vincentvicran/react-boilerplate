import { ComponentPropsWithoutRef } from 'react'
import { toast } from 'react-hot-toast'
import ReactQuill, { Quill } from 'react-quill'
import styled from 'styled-components'
// @ts-ignore
// import BlotFormatter from 'quill-blot-formatter'
// @ts-ignore
import ImageUploader from 'quill-image-uploader'

import 'react-quill/dist/quill.snow.css'
import { api } from 'src/api'
// import { getAboutUsImageURL } from 'src/helpers/getImageUrl.helper'
// import {api} from 'src/api'

// const ImageBase = Quill.import('formats/image')

// const ATTRIBUTES = ['alt', 'height', 'width', 'style']

// export default class CustomImage extends ImageBase {
//   static formats(domNode: any) {
//     return ATTRIBUTES.reduce((formats: any, attribute) => {
//       const copy = {...formats}

//       if (domNode.hasAttribute(attribute)) {
//         copy[attribute] = domNode.getAttribute(attribute)
//       }

//       return copy
//     }, {})
//   }

// format(name: any, value: any) {
//   if (ATTRIBUTES.indexOf(name) > -1) {
//     if (value) {
//       this.domNode.setAttribute(name, value)
//     } else {
//       this.domNode.removeAttribute(name)
//     }
//   } else {
//     super.format(name, value)
//   }
// }
// }

// Quill.register('modules/blotFormatter', BlotFormatter)
// Quill.register('formats/image', CustomImage)

Quill.register('modules/imageUploader', ImageUploader)

interface TextEditorProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  descriptionBody: string
  onChange: (e: string) => void
  placeholder?: string
  customToolbar?: any
}

const TextEditorContainer = styled.div``

export const TextEditor = ({
  descriptionBody,
  onChange,
  placeholder,
  customToolbar,
  ...restProps
}: TextEditorProps) => {
  const onTextChange = (e: string) => {
    onChange(e)
  }

  return (
    <TextEditorContainer {...restProps}>
      <ReactQuill
        modules={{
          ...EditorModules,
          toolbar: customToolbar ?? EditorModules.toolbar,
        }}
        formats={EditorFormats}
        onChange={onTextChange}
        theme="snow"
        value={descriptionBody}
        placeholder={placeholder}
      />
    </TextEditorContainer>
  )
}

const EditorModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],

    [{ size: [] }],
    [{ header: [1, 2, 3, 4, 5, ''] }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    ['blockquote', 'code-block'],

    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageUploader: {
    upload: (file: any) => {
      return new Promise((resolve, reject) => {
        if (
          !file.type.includes('png') &&
          !file.type.includes('jpg') &&
          !file.type.includes('jpeg')
        ) {
          toast.error('Error: Unsupported Image Format')
          toast.error('Please upload an image in JPG, PNG, or JPEG format.')
          return
        }
        const imgUrl = async () => {
          const image = new FormData()
          image.append('image', file)
          const response = await api<Api.Base<[string]>>('post')(
            'common/images',
            undefined,
            image,
          )
          // return getAboutUsImageURL(response.data.data.data.at(0))
        }
        const imageUrl = imgUrl()
        resolve(imageUrl)
      })
    },
  },
}

const EditorFormats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'indent',
  'size',
  'header',
  'link',
  'image',
  'video',
  'color',
  'background',
  'blockquote',
  'code-block',
  'clean',
  'height',
  'width',
  'class',
  'style',
]
