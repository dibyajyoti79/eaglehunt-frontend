import { teams } from "../constants";
import { Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

const Teams = () => {
  return (
    <div className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        Meet Our Team
      </h2>
      <div className="flex flex-wrap justify-center">
        {teams.map((member, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin text-center">
              <img
                className="w-24 h-24 mx-auto rounded-full border border-neutral-300 mb-4"
                src={member.image}
                alt={member.name}
              />
              <h6 className="text-lg font-semibold">{member.name}</h6>
              <p className="text-sm text-neutral-400 mb-4">{member.position}</p>
              <p className="mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="text-neutral-400 hover:text-blue-600 transition duration-200" />
                  </a>
                )}
                {member.social.facebook && (
                  <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="text-neutral-400 hover:text-blue-600 transition duration-200" />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="text-neutral-400 hover:text-blue-600 transition duration-200" />
                  </a>
                )}
                {member.social.instagram && (
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="text-neutral-400 hover:text-blue-600 transition duration-200" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
