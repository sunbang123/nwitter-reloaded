import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Stickie from "./stickie";

export interface IStickie {
    id: string;
    photo: string;
    stickie: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
    const [stickies, setStickie] = useState<IStickie[]>([]);
    const fetchStickies = async () => {
        const stickiesQuery = query(
            collection(db, "stickies"),
            orderBy("createdAt", "desc")
        );
        const spanshot = await getDocs(stickiesQuery);
        const stickies = spanshot.docs.map((doc) => {
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
        setStickie(stickies);
    }
    useEffect(()=>{
        fetchStickies();
    }, []);
    return (
        <Wrapper>
            {stickies.map((stickie) => (
                <Stickie key={stickie.id} {...stickie} />
            ))}
        </Wrapper>
    );
}