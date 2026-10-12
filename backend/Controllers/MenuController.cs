using CampusEats.Api.Dtos;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusEats.Api.Controllers;

[ApiController] // auto 400 on invalid body
[Route("api/[controller]")] // /api/menu
public class MenuController : ControllerBase
{
    private readonly IMenuService _svc;

    // injected by DI
    public MenuController(IMenuService svc) => _svc = svc;

    // GET /api/menu (Public)
    [HttpGet]
    public ActionResult<IEnumerable<MenuItemDto>> GetAll()
        => Ok(_svc.GetAll());

    // GET /api/menu/{id} (Public)
    [HttpGet("{id}")]
    public ActionResult<MenuItemDto> GetById(int id)
    {
        var item = _svc.GetById(id);
        return item is null ? NotFound() : Ok(item);
    }

    // POST /api/menu (Admin Only)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public ActionResult<MenuItemDto> Create([FromBody] CreateMenuItemDto dto)
    {
        var created = _svc.Create(dto);
        return CreatedAtAction(nameof(GetById),
            new { id = created.Id }, created); // 201
    }

    // PUT /api/menu/{id} (Admin Only)
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update(int id, [FromBody] CreateMenuItemDto dto)
    {
        var ok = _svc.Update(id, dto);
        return ok ? NoContent() : NotFound(); // 204 / 404
    }

    // DELETE /api/menu/{id} (Admin Only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete(int id)
    {
        var ok = _svc.Delete(id);
        return ok ? NoContent() : NotFound(); // 204 / 404
    }
}