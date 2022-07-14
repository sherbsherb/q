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
  icon?: React.ReactNode | string
  name?: string
  link?: any
  func?: () => void,
  menu?: MenuType[]
}

export const navStructure: MenuType[] = [
  {
    id: 'top',
    menu: [
      {
        id: id(5),
        icon: <BookIcon />,
        name: 'Link A',
        link: '/linkA'
      },
      {
        id: id(5),
        icon: plusIcon,
        name: 'menu 1',
        menu: [
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇',
            menu: [
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                menu: [
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
        icon: <BookIcon />,
        name: 'Link B',
        link: '/linkB'
      },
      {
        id: id(5),
        icon: <BookIcon />,
        name: 'Back',
        link: '/'
      },
      {
        id: id(5),
        icon: plusIcon,
        name: 'menu 1',
        menu: [
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇',
            menu: [
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                menu: [
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
        menu: [
          {
            id: id(5),
            name: 'item in menu 2',
            icon: '😇',
            menu: [
              {
                id: id(5),
                name: 'item in menu 2',
                icon: '😎',
                menu: [
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
            name: 'item in menu 2',
            icon: '😇'
          },
          {
            id: id(5),
            name: 'item in menu 2',
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
