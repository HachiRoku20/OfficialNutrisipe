/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { googleLogout } from '@react-oauth/google';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery /* userfollowers, userfollowing*/ } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { fetchUser } from '../utils/fetchUser';

const activeBtnStyles = 'bg-nGreen text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [lengths, setLengths] = useState();
  const [alreadyfollowed, setAlreadyFollowed] = useState(false);
  const [following, setFollowing] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const users = fetchUser();

  // const create = (id) => {
  //   client
  //     .patch(id)
  //     .setIfMissing({ follow: [] })
  //     .insert('after', 'follow[-1]', [{
  //       _key: users.sub,
  //       userId: users.sub,
  //       postedBy: {
  //         _type: 'postedBy',
  //         _ref: users.sub,
  //       }
  //     }])
  //     .commit()
  //     .then(() => {
  //       setAlreadyFollowed(true);
  //       fetchFollower();
  //       fetchfollowing();
  //     });
  // };

  // const fetchfollowing = () => {
  //   const followers = userfollowers(userId);
  //   client.fetch(followers).then((data) => {
  //     setLengths(data[0]?.follow);
  //     if ((data[0]?.follow?.filter((item) => item?.postedBy?._id === users?.sub))?.length > 0) {
  //       setAlreadyFollowed(true);
  //     }
  //   });
  // };

  // const fetchFollower = () => {
  //   client.fetch(userfollowing).then((data) => {
  //     const index = (data?.map((index) => (
  //       index?.follow?.map((index) => index?.postedBy?._id === userId)
  //     )));

  //     const index2 = (index?.map((value) => (
  //       value?.filter((Boolean))
  //     )));

  //     const index3 = (index2?.filter(Boolean).map((index) => index?.length).filter(Number));

  //     setFollowing(index3);
  //   });
  // };

  // const unfollow = (id) => {
  //   const ToRemove = [`follow[userId=="${users.sub}"]`];
  //   client
  //     .patch(id)
  //     .unset(ToRemove)
  //     .commit()
  //     .then(() => {
  //       window.location.reload();
  //     });
  // };

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery)
      .then((data) => {
       setPins(data);
      });
    } 
    else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery)
      .then((data) => {
       setPins(data);
      });
    }
  }, [text, userId]);

  // useEffect(() => {
  //   fetchfollowing();
  // }, [userId]);

  // useEffect(() => {
  //   fetchFollower();
  // }, [userId]);

  if (!user) {
    return <Spinner message="Loading Profile...." />;
  }

  // const alerts = () => {
  //   navigate(`/user-profile/${userId}/following`);
  // };

  const image = 'https://source.unsplash.com/1600x900/?philippines-food';

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="pointer-events-none w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={image}
              alt="banner"
            />
            <img
              className="rounded-full pointer-events-none w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === users.sub && (
               <button
               type="button"
               className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
               onClick={() => {
                 googleLogout();
                 localStorage.clear();
                 navigate('/login');
               }}
             >
               <AiOutlineLogout color="red" fontSize={21} />
             </button>
              )}
            </div>
          </div>

{/*          <div className="text-center mb-7">
            
            <button
              type="button"
              className=" mr-4 text-nGreen font-bold p-1 rounded-full w-24 outline-none "
              onClick={() => navigate(`/user-profile/${userId}/followers`)}
              
            >
              {lengths?.length || 0} Followers
            </button>
          
            <button
              type="button"
              className="mr-4 text-nGreen font-bold p-1 rounded-full w-24 outline-none"
              onClick={alerts}
             
            >
              {following?.length || 0} Following
            </button>
          </div>

          {alreadyfollowed ? (
            
            <div className="text-center mb-7">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  unfollow(userId);
                }}
                className="bg-nGreen text-white font-bold p-2 rounded-full w-30 outline-none "
               
              >
                Following
              </button>
            </div>
          ) : (
            <>
              {userId !== users.sub && (
              <div className="text-center mb-7">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    create(userId);
                  }}
                  className="bg-gray-400 text-white font-bold p-2 rounded-full w-30 outline-none "
                >
                  Follow
                </button>
              </div>
              )}
            </>
          )}
                */}
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
              
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>

          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins found!
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
