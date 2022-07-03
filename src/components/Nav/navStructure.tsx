import { FaReact } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMenuBook as BookIcon } from 'react-icons/md'
import React from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

const reactIcon = React.createElement(FaReact, {})
const plusIcon = React.createElement(AiOutlinePlus, {})

const navStructure = [
  {
    navItem: true,
    visible: true,
    icon: <BookIcon />,
    text: <Link to="/linkA">Link A</Link>,
    link: '/linkA',
    menu: null,
    id: nanoid()
  },
  {
    navItem: true,
    visible: true,
    icon: <BookIcon />,
    text: <Link to="/linkB">Link B</Link>,
    link: '/linkB',
    menu: null,
    id: nanoid()
  },
  {
    navItem: true,
    visible: true,
    icon: <BookIcon />,
    text: <Link to="/">Back</Link>,
    link: '/',
    menu: null,
    id: nanoid()
  },
  {
    navItem: true,
    visible: true,
    icon: plusIcon,
    text: 'menu 1',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 1',
                iconLeft: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    }
                  ]
                },
                id: nanoid()
              },
              {
                text: 'item in menu 1',
                iconLeft: '😎',
                menu: null,
                id: nanoid()
              },
              {
                text: 'item in menu 1',
                iconLeft: '😎',
                menu: null,
                id: nanoid()
              }
            ]
          },
          id: nanoid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        }
      ]
    },
    id: nanoid()
  },
  {
    navItem: true,
    visible: true,
    icon: plusIcon,
    text: 'menu 2',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 2',
                iconLeft: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    }
                  ]
                },
                id: nanoid()
              },
              {
                text: 'item in menu 2',
                iconLeft: '😎',
                menu: null,
                id: nanoid()
              },
              {
                text: 'item in menu 2',
                iconLeft: '😎',
                menu: null,
                id: nanoid()
              }

            ]
          },
          id: nanoid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        }
      ],
      id: nanoid()
    },
    id: nanoid()
  },
  {
    navItem: true,
    visible: true,
    icon: plusIcon,
    text: 'menu 3',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 3',
                iconLeft: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: nanoid()
                    }
                  ]
                },
                id: nanoid()
              },
              {
                text: 'item in menu 3',
                iconLeft: '😎',
                menu: null,
                id: nanoid()
              },
              {
                text: 'item in menu 3',
                iconLeft: '😎',
                menu: null,
                id: nanoid()
              }

            ]
          },
          id: nanoid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '',
          menu: null,
          id: nanoid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: null,
          id: nanoid()
        }
      ],
      id: nanoid()
    },
    id: nanoid()
  }
]

export default navStructure
