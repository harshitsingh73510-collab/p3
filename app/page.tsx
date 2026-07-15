import Ether from "@/components/webgl/Ether";
import Chrome from "@/components/system/Chrome";
import Preloader from "@/components/system/Preloader";

import FirstBreath from "@/components/sections/FirstBreath";
import Memory from "@/components/sections/Memory";
import Extraction from "@/components/sections/Extraction";
import Bottle from "@/components/sections/Bottle";
import Maker from "@/components/sections/Maker";
import Collection from "@/components/sections/Collection";
import Science from "@/components/sections/Science";
import Time from "@/components/sections/Time";
import LastMemory from "@/components/sections/LastMemory";

export default function Home() {
  return (
    <>
      {/* the house announces itself, then gets out of the way */}
      <Preloader />

      {/* the one persistent particle field, behind the entire film */}
      <Ether />
      <Chrome />

      <main className="relative z-[2]">
        <FirstBreath />
        <Memory />
        <Extraction />
        <Bottle />
        <Maker />
        <Collection />
        <Science />
        <Time />
        <LastMemory />
      </main>
    </>
  );
}
