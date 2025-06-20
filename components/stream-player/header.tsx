"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { VerifiedMark } from "../verified-mark";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
  viewerIdentity: string;
}

export const Header = ({
  hostName,
  hostIdentity,
  imageUrl,
  isFollowing,
  name,
  viewerIdentity,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host#${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-start justify-between px-4 md:items-center">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size={"large"}
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground"> {name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-2 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount == 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground uppercase">
              Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-4  md:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size="large" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
