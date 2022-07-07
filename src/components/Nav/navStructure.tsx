import { FaReact } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMenuBook as BookIcon } from 'react-icons/md'
import React from 'react'
import { nanoid as id } from 'nanoid'
import { Link } from 'react-router-dom'
import logo from '@components/Main/DefaultViteComponent/logo.svg'

const reactIcon = React.createElement(FaReact, {})
const plusIcon = React.createElement(AiOutlinePlus, {})

export type MenuType = {
  id: string
  visible?: boolean
  icon?: React.ReactNode | string
  text?: string
  link?: any
  func?: () => void,
  menu?: MenuType[] | null | undefined,
}
export type MenuTypeInObject = { menuO: MenuType }

export const navStructure = [
  {
    id: id(5),
    visible: true,
    icon: <BookIcon />,
    text: 'Link A',
    link: '/linkA'
  },
  {
    id: id(5),
    visible: true,
    icon: <BookIcon />,
    text: 'Link B',
    link: '/linkB'
  },
  {
    id: id(5),
    visible: true,
    icon: <BookIcon />,
    text: 'Back',
    link: '/'
  },
  {
    id: id(5),
    visible: true,
    icon: plusIcon,
    text: 'menu 1',
    menu: [
      {
        id: id(5),
        text: 'item in menu 1',
        icon: '😇',
        menu: [
          {
            text: 'item in menu 1',
            icon: '😎',
            menu: [
              {
                text: 'long long long long long long long long text',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: null,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: <img src={logo} />,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: reactIcon,
                id: id(5)
              }
            ],
            id: id(5)
          },
          {
            text: 'item in menu 1',
            icon: '😎',
            id: id(5)
          },
          {
            text: 'item in menu 1',
            icon: '😎',
            id: id(5)
          }
        ]
      },
      {
        id: id(5),
        text: 'item in menu 1',
        icon: 'IC'
      },
      {
        id: id(5),
        text: 'item in menu 1',
        icon: '😇'
      },
      {
        id: id(5),
        text: 'item in menu 1',
        icon: ''
      },
      {
        id: id(5),
        text: 'item in menu 1',
        icon: '😇'
      }
    ]
  },
  {
    id: id(5),
    visible: true,
    icon: plusIcon,
    text: 'menu 2',
    menu: [
      {
        id: id(5),
        text: 'item in menu 2',
        icon: '😇',
        menu: [
          {
            text: 'item in menu 2',
            icon: '😎',
            menu: [
              {
                text: 'long long long long long long long long text',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: reactIcon,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: reactIcon,
                id: id(5)
              }
            ],
            id: id(5)
          },
          {
            text: 'item in menu 2',
            icon: '😎',
            id: id(5)
          },
          {
            text: 'item in menu 2',
            icon: '😎',
            id: id(5)
          }
        ]
      },
      {
        id: id(5),
        text: 'item in menu 2',
        icon: '😇'
      },
      {
        id: id(5),
        text: 'item in menu 2',
        icon: '😇'
      },
      {
        id: id(5),
        text: 'item in menu 2',
        icon: ''
      },
      {
        id: id(5),
        text: 'item in menu 2',
        icon: '😇'
      }
    ]
  }
]
