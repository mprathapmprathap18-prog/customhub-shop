import { Link, useNavigate } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import { useEffect } from 'react';
import { getShopInfo } from '../../../actions/shopAction';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import logo from '../../../assets/images/logo.png';

const navMenu = [
    {
        icon: <EqualizerIcon />,
        label: "Dashboard",
        ref: "/admin/dashboard",
    },
    {
        icon: <ShoppingBagIcon />,
        label: "Orders",
        ref: "/admin/orders",
    },
    {
        icon: <InventoryIcon />,
        label: "Products",
        ref: "/admin/products",
    },
    {
        icon: <AddBoxIcon />,
        label: "Add Product",
        ref: "/admin/new_product",
    },
    {
        icon: <GroupIcon />,
        label: "Users",
        ref: "/admin/users",
    },
    {
        icon: <ReviewsIcon />,
        label: "Reviews",
        ref: "/admin/reviews",
    },
    {
        icon: <AccountBoxIcon />,
        label: "My Profile",
        ref: "/account",
    },
    {
        icon: <LogoutIcon />,
        label: "Logout",
    },
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { shop } = useSelector((state) => state.shopInfo);

    useEffect(() => {
        dispatch(getShopInfo());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-gray-800 text-white overflow-x-hidden border-r">
            <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg shadow-lg my-4 mx-3.5 border border-yellow-500/30">
                <img src={logo} alt="Custom Hub" className="w-10 h-10 rounded-full object-contain bg-white p-0.5" />
                <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-wide text-yellow-400">CUSTOM HUB</span>
                    <span className="text-gray-300 text-[10px] uppercase font-semibold">Sublimation & Gifts</span>
                </div>
                <button onClick={()=>setToggleSidebar(false)} className="sm:hidden bg-gray-800 ml-auto rounded-full w-8 h-8 flex items-center justify-center">
                    <CloseIcon sx={{ fontSize: "18px" }} />
                </button>
            </div>

            <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow my-2 mx-3.5">
                <Avatar
                    alt="Avatar"
                    src={user.avatar.url}
                />
                <div className="flex flex-col gap-0 overflow-hidden">
                    <span className="font-medium text-sm truncate">{user.name}</span>
                    <span className="text-gray-300 text-xs truncate">{user.email}</span>
                </div>
            </div>

            {/* Shop Owner Info Section */}
            {shop && shop.owner && (
                <div className="bg-gradient-to-b from-blue-700 to-blue-900 p-3 rounded-lg shadow-lg my-4 mx-3.5">
                    <h4 className="text-xs font-bold text-blue-100 mb-2 uppercase">📦 Shop Owner</h4>
                    <div className="space-y-2 text-xs text-blue-50">
                        <div>
                            <p className="text-blue-200 font-semibold">{shop.shopDisplayName || shop.shopName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <EmailIcon sx={{ fontSize: "14px", color: "#dbeafe" }} />
                            <a href={`mailto:${shop.owner.email}`} className="text-blue-200 hover:text-white break-all">
                                {shop.owner.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon sx={{ fontSize: "14px", color: "#dbeafe" }} />
                            <a href={`tel:${shop.owner.phone}`} className="text-blue-200 hover:text-white">
                                {shop.owner.phone}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col w-full gap-0 my-8">
                {navMenu.map((item, index) => {
                    const { icon, label, ref } = item;
                    return (
                        <>
                            {label === "Logout" ? (
                                <button onClick={handleLogout} className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium">
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <Link to={ref} className={`${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-3 px-4 font-medium`}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            )}
                        </>
                    )
                }
                )}
            </div>

            <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded-lg shadow-lg mb-6 mt-28 mx-3.5 overflow-hidden">
                <h5>Developed with ❤️ by:</h5>
                <div className="flex flex-col gap-0">
                    <a href="https://www.linkedin.com/in/jigar-sable" target="_blank" rel="noreferrer" className="font-medium text-lg hover:text-blue-500">Jigar Sable</a>
                    <a href="mailto:jigarsable21@gmail.com" className="text-gray-300 text-sm hover:text-blue-500">jigarsable21@gmail.com</a>
                </div>
            </div>
        </aside>
    )
};

export default Sidebar;
