import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);

  return (

    <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10 shadow-sm">

      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

        <div className="flex items-center flex-1">
          <Link className="mr-2 sm:mr-4 flex items-center gap-2 min-w-max" to="/">
            <img src={logo} alt="Custom Hub" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full bg-white shadow-sm p-0.5 border border-yellow-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-gray-900 font-black text-base sm:text-lg tracking-tight">CUSTOM HUB</span>
              <span className="text-gray-700 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">Sublimation Shop</span>
            </div>
          </Link>

          <Searchbar />
        </div>

        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

          {isAuthenticated === false ?
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-gray-800 bg-white border border-gray-300 font-medium rounded-sm cursor-pointer">Login</Link>
            :
            (
              <span className="userDropDown flex items-center text-gray-800 font-medium gap-1 cursor-pointer" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
                <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>
            )
          }

          {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}

          <Link to="/cart" className="flex items-center text-gray-800 font-medium gap-2 relative">
            <span><ShoppingCartIcon /></span>
            {cartItems.length > 0 &&
              <div className="w-5 h-5 p-2 bg-gray-800 text-xs text-white rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            }
            Cart
          </Link>
        </div>

      </div>
    </header>
  )
};

export default Header;
