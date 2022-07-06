import { FaReact } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMenuBook as BookIcon } from 'react-icons/md'
import React from 'react'
import { nanoid as id } from 'nanoid'
import { Link } from 'react-router-dom'
import logo from '@components/Main/DefaultViteComponent/logo.svg'

const reactIcon = React.createElement(FaReact, {})
const plusIcon = React.createElement(AiOutlinePlus, {})

export const navStructure = [
  {
    visible: true,
    icon: <BookIcon />,
    text: 'Link A',
    link: '/linkA',
    reactRoute: null,
    func: null,
    menu: null,
    id: id(5)
  },
  {
    visible: true,
    icon: <BookIcon />,
    text: 'Link B',
    link: '/linkB',
    reactRoute: null,
    func: null,
    menu: null,
    id: id(5)
  },
  {
    visible: true,
    icon: <BookIcon />,
    text: 'Back',
    link: '/',
    reactRoute: null,
    func: null,
    menu: null,
    id: id(5)
  },
  {
    visible: true,
    icon: plusIcon,
    text: 'menu 1',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 1',
          icon: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 1',
                icon: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 1',
                      icon: null,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 1',
                      icon: <img src={logo} />,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 1',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 1',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 1',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 1',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    }
                  ]
                },
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: '😎',
                menu: null,
                id: id(5)
              },
              {
                text: 'item in menu 1',
                icon: '😎',
                menu: null,
                id: id(5)
              }
            ]
          },
          id: id(5)
        },
        {
          text: 'item in menu 1',
          icon: '😇',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 1',
          icon: '😇',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 1',
          icon: '',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 1',
          icon: '😇',
          menu: null,
          id: id(5)
        }
      ]
    },
    id: id(5)
  },
  {
    visible: true,
    icon: plusIcon,
    text: 'menu 2',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 2',
          icon: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 2',
                icon: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 2',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 2',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 2',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 2',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 2',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 2',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    }
                  ]
                },
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: '😎',
                menu: null,
                id: id(5)
              },
              {
                text: 'item in menu 2',
                icon: '😎',
                menu: null,
                id: id(5)
              }

            ]
          },
          id: id(5)
        },
        {
          text: 'item in menu 2',
          icon: '😇',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 2',
          icon: '😇',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 2',
          icon: '',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 2',
          icon: '😇',
          menu: null,
          id: id(5)
        }
      ],
      id: id(5)
    },
    id: id(5)
  },
  {
    visible: true,
    icon: plusIcon,
    text: 'menu 3',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 3',
          icon: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 3',
                icon: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 3',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 3',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 3',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 3',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 3',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    },
                    {
                      text: 'item in menu 3',
                      icon: reactIcon,
                      menu: null,
                      id: id(5)
                    }
                  ]
                },
                id: id(5)
              },
              {
                text: 'item in menu 3',
                icon: '😎',
                menu: null,
                id: id(5)
              },
              {
                text: 'item in menu 3',
                icon: '😎',
                menu: null,
                id: id(5)
              }

            ]
          },
          id: id(5)
        },
        {
          text: 'item in menu 3',
          icon: '😇',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 3',
          icon: '😇',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 3',
          icon: '',
          menu: null,
          id: id(5)
        },
        {
          text: 'item in menu 3',
          icon: '😇',
          menu: null,
          id: id(5)
        }
      ],
      id: id(5)
    },
    id: id(5)
  }
]
