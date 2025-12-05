import React from "react"
import 'css/pages/home.css'
import me_twitter from 'images/me_twitter.jpg'


export default function HomePage() {
  return (
        <>
            <div class="profile_picture">
                <img src={me_twitter} />
            </div>           
        </>
    )
}    