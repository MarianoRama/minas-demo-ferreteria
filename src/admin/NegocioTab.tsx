import { useState } from 'react'
import { DIAS_LABEL } from '../config'
import { useDatos } from '../data/contexto'
import type { Rango } from '../config'

const inputClase =
  'mt-1 w-full min-h-[44px] border-2 border-graphite-soft/30 bg-white px-3 py-2 text-sm text-graphite outline-none transition focus:border-tool'
const labelClase = 'block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite'

function horaATexto([h, m]: [number, number]): string {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function textoAHora(texto: string): [number, number] {
  const [h, m] = texto.split(':').map(Number)
  return [Number.isFinite(h) ? h : 0, Number.isFinite(m) ? m : 0]
}

export function NegocioTab() {
  const { negocio, actualizarNegocio } = useDatos()
  const [guardado, setGuardado] = useState(false)
  const [form, setForm] = useState(negocio)

  function campo<K extends keyof typeof form>(clave: K, valor: (typeof form)[K]) {
    setForm((actual) => ({ ...actual, [clave]: valor }))
    setGuardado(false)
  }

  function cambiarRango(dia: number, indice: number, cambios: Partial<Rango>) {
    const rangosDia = [...(form.horarios[dia] ?? [])]
    rangosDia[indice] = { ...rangosDia[indice], ...cambios }
    campo('horarios', { ...form.horarios, [dia]: rangosDia })
  }

  function agregarRango(dia: number) {
    const rangosDia = [...(form.horarios[dia] ?? []), { desde: [8, 0] as [number, number], hasta: [12, 0] as [number, number] }]
    campo('horarios', { ...form.horarios, [dia]: rangosDia })
  }

  function quitarRango(dia: number, indice: number) {
    const rangosDia = (form.horarios[dia] ?? []).filter((_, i) => i !== indice)
    campo('horarios', { ...form.horarios, [dia]: rangosDia })
  }

  function guardar(e: React.FormEvent) {
    e.preventDefault()
    actualizarNegocio(form)
    setGuardado(true)
  }

  return (
    <form onSubmit={guardar} className="space-y-8">
      <section className="border-2 border-graphite bg-kraft p-5 sm:p-7">
        <h2 className="font-display text-xl uppercase text-graphite">Datos del negocio</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClase}>
            Nombre del negocio
            <input value={form.nombre} onChange={(e) => campo('nombre', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Frase corta (slogan)
            <input value={form.slogan} onChange={(e) => campo('slogan', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Dirección
            <input value={form.direccion} onChange={(e) => campo('direccion', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Ciudad
            <input value={form.ciudad} onChange={(e) => campo('ciudad', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Referencia (para ubicar el local)
            <input value={form.referencia} onChange={(e) => campo('referencia', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Teléfono fijo
            <input value={form.telefonoFijo} onChange={(e) => campo('telefonoFijo', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            WhatsApp (con código de país, sin +)
            <input
              value={form.whatsappNumero}
              onChange={(e) => campo('whatsappNumero', e.target.value.replace(/\D/g, ''))}
              className={inputClase}
              placeholder="59899000000"
            />
            <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-graphite-soft">
              Solo números: código de país + número, sin espacios ni el +.
            </span>
          </label>
          <label className={labelClase}>
            WhatsApp (como se muestra en el sitio)
            <input value={form.whatsappDisplay} onChange={(e) => campo('whatsappDisplay', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Email
            <input type="email" value={form.email} onChange={(e) => campo('email', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Instagram (con @)
            <input value={form.instagram} onChange={(e) => campo('instagram', e.target.value)} className={inputClase} />
          </label>
          <label className={labelClase}>
            Año de fundación
            <input
              type="number"
              value={form.anioFundacion}
              onChange={(e) => campo('anioFundacion', Number(e.target.value))}
              className={inputClase}
            />
          </label>
        </div>

        <label className={`${labelClase} mt-5 block`}>
          Aviso del inicio (franja destacada arriba de la página)
          <textarea
            value={form.avisoHome}
            onChange={(e) => campo('avisoHome', e.target.value)}
            rows={2}
            className={`${inputClase} resize-y`}
            placeholder="Este sábado abrimos hasta las 13"
          />
        </label>
      </section>

      <section className="border-2 border-graphite bg-kraft p-5 sm:p-7">
        <h2 className="font-display text-xl uppercase text-graphite">Horarios de atención</h2>
        <p className="mt-1 text-sm text-graphite-soft">
          Un día sin franjas horarias queda marcado como cerrado.
        </p>

        <div className="mt-5 space-y-5">
          {DIAS_LABEL.map((label, dia) => (
            <div key={label} className="border-2 border-dashed border-graphite/20 p-4">
              <p className="font-condensed text-sm font-bold uppercase tracking-wide text-graphite">{label}</p>
              <div className="mt-3 space-y-2">
                {(form.horarios[dia] ?? []).map((rango, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2">
                    <input
                      type="time"
                      value={horaATexto(rango.desde)}
                      onChange={(e) => cambiarRango(dia, i, { desde: textoAHora(e.target.value) })}
                      className="min-h-[44px] border-2 border-graphite-soft/30 bg-white px-2 text-sm"
                    />
                    <span className="text-sm text-graphite-soft">a</span>
                    <input
                      type="time"
                      value={horaATexto(rango.hasta)}
                      onChange={(e) => cambiarRango(dia, i, { hasta: textoAHora(e.target.value) })}
                      className="min-h-[44px] border-2 border-graphite-soft/30 bg-white px-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => quitarRango(dia, i)}
                      className="min-h-[36px] px-2 text-xs font-semibold uppercase text-tool underline underline-offset-2"
                    >
                      Quitar franja
                    </button>
                  </div>
                ))}
                {(form.horarios[dia] ?? []).length === 0 && (
                  <p className="text-sm text-graphite-soft/70">Cerrado todo el día.</p>
                )}
                {(form.horarios[dia] ?? []).length < 2 && (
                  <button
                    type="button"
                    onClick={() => agregarRango(dia)}
                    className="min-h-[36px] border-2 border-graphite-soft/40 px-3 font-condensed text-xs font-bold uppercase tracking-wide text-graphite-soft"
                  >
                    + Agregar franja
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="min-h-[48px] border-2 border-ok bg-ok px-6 font-condensed text-sm font-bold uppercase tracking-wide text-kraft"
        >
          Guardar cambios
        </button>
        {guardado && <p className="text-sm font-semibold text-ok" role="status">Guardado. Ya se ve en el sitio.</p>}
      </div>
    </form>
  )
}
