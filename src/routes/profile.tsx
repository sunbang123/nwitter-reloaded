import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
  } from "firebase/firestore";
import { IStickie } from "../components/timeline";
import Stickie from "../components/stickie";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 50px;
    }
`;

const AvatarImg = styled.img`
    width: 100%;
`;

const AvatarInput = styled.input`
    display:none;
`;

const Name = styled.span`
    font-size: 22px;
`;
const Stickies = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
export default function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL); // 옵셔널 체이닝 문법으로 null이거나 undefined인 경우에도 오류를 발생시키지 않고 undefined를 반환함.
    const [stickies, setStickies] = useState<IStickie[]>([]);
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
        }
    };
    const fetchStickies = async () => {
        const stickieQuery = query(
          collection(db, "stickies"),
          where("userId", "==", user?.uid),
          orderBy("createdAt", "desc"),
          limit(25)
        );
        const snapshot = await getDocs(stickieQuery);
        const stickies = snapshot.docs.map((doc) => {
          const { stickie, createdAt, userId, username, photo } = doc.data();
          return {
            stickie,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setStickies(stickies);
      };
      useEffect(() => {
        fetchStickies();
      }, []);

    return (
        <Wrapper className="mt-4">
            <AvatarUpload htmlFor = "avatar">
                {avatar ? (
                    <AvatarImg src = {avatar} />
                ):(
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                )}
            </AvatarUpload>
            <AvatarInput
                onChange={onAvatarChange}
                id="avatar"
                type="file"
                accept="image/*"
            />
            <Name>{user?.displayName ?? "Anonymous"}</Name>
            <Stickies>
                {stickies.map((stickie) => (
                    <Stickie key={stickie.id} {...stickie} />
                ))}
            </Stickies>
        </Wrapper>
    );
}