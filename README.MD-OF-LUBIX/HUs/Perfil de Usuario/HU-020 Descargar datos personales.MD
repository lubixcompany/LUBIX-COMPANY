# HU-020 — Cancelar pedido

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-020 |
| Título | Cancelar pedido |
| Módulo | Pedidos |
| Prioridad | Media |
| Estado | Pendiente |
| RF asociados | RF-020 |

---

## Historia

Como usuario de Lubix, quiero cancelar un pedido, para corregir una compra realizada por error.

---

## Criterios de aceptación

### CA-020.1 — Opción de cancelación
Debe existir botón de cancelar pedido.

### CA-020.2 — Restricción por estado
Solo se pueden cancelar pedidos pendientes.

### CA-020.3 — Confirmación de cancelación
El sistema debe pedir confirmación antes de cancelar.

### CA-020.4 — Actualización de estado
El pedido debe cambiar a estado "Cancelado".