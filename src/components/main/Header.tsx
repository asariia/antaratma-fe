import * as React from "react"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { Logout } from "@mui/icons-material"
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { sections, title } from "@/tools/helper"
import { UserContext } from "@/app/UserContext"
import { config } from "@/tools/helper"
import axios from "axios"
import { makeUseAxios } from "axios-hooks"

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: process.env.NEXT_PUBLIC_BASEURL, ...config }),
})

export default function Header() {
  const { push } = useRouter()
  const { user = { name: "" }, setUser } = React.useContext(UserContext)

  if (user.name) {
    const [{ data: userData = {}, error, loading }] = useAxios<any>({
      url: "/profile",
    })
    if (!loading && !error) setUser(userData)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleUser = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const camelize = (str: string) => {
    return str
      .split(" ")
      .slice(0, 2)
      .join("")
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase()
      })
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <div>
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              sx={{ p: 1, flexShrink: 0 }}
            >
              {section.title}
            </Link>
          ))}

          {(user.name && (
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          )) || (
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 3 }}
              onClick={() => push("/login")}
            >
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
      {user.name && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleUser}>
            <Avatar /> {camelize(user.name)}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </React.Fragment>
  )
}
