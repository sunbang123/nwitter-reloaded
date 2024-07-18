import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 2fr 1fr;
    height: 100%;
    width: 100%;
    background-color: white;
`;

const Img = styled.img`
    width: 4em;
`;

const Menu = styled.div`
    display:flex;
    flex-direction: column;
`;

const MenuItem = styled.div`
    cursor: pointer;
    align-items: center;
    justify-content: center;
`;

export default function Layout(){
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("Are you sure want to log out?");
        if (ok) {
            await auth.signOut();
            navigate("/login");
        }
    }

    return (
        <Wrapper>
            <Menu className="p-5">
                <Link to="/">
                    <Img className="mb-4 mt-5" src="logo.png"></Img>
                </Link>
                <Link to="/" className="border border-secondary-subtle border-bottom-0 text-black text-decoration-none p-3 fs-5 rounded-top-3">홈</Link>
                <Link to="/profile" className="border border-secondary-subtle text-black text-decoration-none p-3 fs-5 rounded-bottom-3">프로필</Link>
                <button type="button" className="mt-4 btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    게시하기
                </button>
                <MenuItem onClick={onLogOut} className="log-out">
                    <Img className="mt-5" src="logout.png"></Img>
                    <p>로그아웃</p>
                </MenuItem>
            </Menu>
            <Outlet />
            <Menu className="p-5">
                <div className="border border-secondary-subtle border-bottom-0 text-black text-decoration-none p-3 fs-5 rounded-top-3">추천친구</div>
                <div className="border border-secondary-subtle text-black text-decoration-none p-3 fs-5 rounded-bottom-3">메세지</div>
            </Menu>
        </Wrapper>
    )
}