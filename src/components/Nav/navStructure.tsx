import { FaReact } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMenuBook as BookIcon } from 'react-icons/md'
import React from 'react'
import { nanoid as id } from 'nanoid'
import logo from '@components/Main/DefaultViteComponent/logo.svg'

const reactIcon = React.createElement(FaReact, {})
const plusIcon = React.createElement(AiOutlinePlus, {})

export type MenuType = {
  id: string
  icon?: React.ReactNode | string
  name: string
  link?: any
  func?: () => void,
  shortcut?: string[],
  menuItems?: MenuType[]
}

export const navStructure: MenuType[] = [
  {
    id: 'top',
    name: 'top',
    menuItems: [
      {
        id: id(5),
        icon: <BookIcon />,
        name: 'Link A',
        link: '/linkA',
        shortcut: ['control', 'z']
      },
      {
        id: id(5),
        name: 'func',
        func: () => alert('i am the function')
      },
      {
        id: id(5),
        icon: plusIcon,
        name: 'menu 1',
        menuItems: [
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇',
            menuItems: [
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                menuItems: [
                  {
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  }
                ]
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              }
            ]
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: 'IC'
          },
          {
            id: id(5),
            name: 'link',
            link: '/',
            icon: '😇',
            shortcut: ['control', 'x']
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: ''
          },
          {
            id: id(5),
            name: 'func',
            func: () => alert('i am the function'),
            shortcut: ['control', 'c']
          }
        ]
      },
      {
        id: id(5),
        icon: <BookIcon />,
        name: 'Link B',
        link: '/linkB'
      },
      {
        id: id(5),
        icon: <BookIcon />,
        name: 'Main',
        link: '/'
      },
      {
        id: id(5),
        icon: plusIcon,
        name: 'menu 1',
        menuItems: [
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇',
            menuItems: [
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                menuItems: [
                  {
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  }
                ]
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              }
            ]
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: 'IC'
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇'
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: ''
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇'
          }
        ]
      },
      {
        id: id(5),
        icon: plusIcon,
        name: 'menu 2',
        menuItems: [
          {
            id: id(5),
            name: 'item in menu 2',
            icon: '😇',
            menuItems: [
              {
                id: id(5),
                name: 'item in menu 2',
                icon: '😎',
                menuItems: [
                  {
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 2',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 2',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 2',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 2',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 2',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 2',
                    icon: reactIcon
                  }
                ]
              },
              {
                id: id(5),
                name: 'item in menu 2',
                icon: '😎'
              },
              {
                id: id(5),
                name: 'item in menu 2',
                icon: '😎'
              }
            ]
          },
          {
            id: id(5),
            name: 'hidden menu',
            icon: '😇'
          },
          {
            id: id(5),
            name: 'not hidden menu',
            icon: '😇'
          },
          {
            id: id(5),
            name: 'item in menu 2',
            icon: ''
          },
          {
            id: id(5),
            name: 'item in menu 2',
            icon: '😇'
          }
        ]
      }
    ]
  }
]
