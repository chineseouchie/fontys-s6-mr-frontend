import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function MenuItem({ route, text, icon, open }) {
	return (
		<Link to={route}>
			<ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
				<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
					{icon}
				</ListItemIcon>
				<ListItemText sx={{ opacity: open ? 1 : 0 }}>
					{text}
				</ListItemText>
			</ListItemButton>
		</Link>
	)
}
