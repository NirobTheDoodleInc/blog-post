"use client";
import { useEffect, useState } from "react"
import "../configureAmplify"
import { API } from "aws-amplify"
import { listPosts } from "@/src/graphql/queries"
import Navbar from "./components/navbar";

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPost()
  }, [])
  const fetchPost = async () => {
    const postData = await API.graphql({
      query: listPosts
    })
    setPosts(postData.data.listPosts.items)
  }
  return (
    <main className="bg-white">
      <Navbar></Navbar>
      <div>
        {
          posts.map((post, index) => {
            return (
              <p key={index}>{post.content}</p>
            )
          })
        }
      </div>
    </main>
  )
}
