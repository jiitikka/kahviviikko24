import Image from 'next/image';

const About = () => (
  <section
    id="mika-on"
    className="tkv-gutter tkv-section-y flex flex-wrap items-center justify-between gap-[clamp(28px,5vw,64px)] border-t-rule border-coffee bg-white"
  >
    <div className="flex min-w-0 flex-1 basis-[420px] flex-col items-start gap-5">
      <span className="tkv-label">Mikä kahviviikko on</span>
      <h2 className="tkv-h2 max-w-[760px] text-coffee">
        Kahviloissa ja paahtimoissa porisee
      </h2>
      <p className="tkv-body max-w-[760px] text-coffee">
        Tampereen kahviviikko on syntynyt rakkaudesta hyvään kahviin ja halusta
        nostaa esiin seudun parhaita kahviloita ja paahtimoita. Viikkoa
        järjestää vapaaehtoisten kahvinystävien tiimi.
      </p>
      <p className="tkv-body max-w-[760px] text-coffee">
        <b className="font-display font-bold">To 1.– Su 11.10.2026</b> Tampereen
        ja lähiseudun kahviloissa ja paahtimoissa tapahtuu: kierrä{' '}
        <a href="#kahvilat">mukana olevia kahviloita</a> ja kerää leimoja{' '}
        <a href="#epakantiskortti">epäkantiskorttiisi</a>. Joka viidennellä
        leimalla saat ilmaisen kahvijuoman.
        <br />
        <br />
        <b className="font-display font-bold">
          HUOM! Epäkantiskortti on voimassa 18.10. asti.
        </b>
      </p>
    </div>

    <span
      aria-hidden="true"
      className="relative block w-[min(38vw,165px)] shrink basis-[165px] grow-0"
    >
      <Image
        src="/brand/cup.svg"
        alt=""
        width={165}
        height={220}
        className="block h-auto w-full"
      />
      <Image
        src="/brand/papu-yksivari-valkoinen.svg"
        alt=""
        width={56}
        height={56}
        className="absolute left-1/2 top-[57%] h-auto w-[34%] -translate-x-1/2 -translate-y-1/2"
      />
    </span>
  </section>
);

export default About;
